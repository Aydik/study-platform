import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Input, Switch, Button, Card, Space, Divider, App } from 'antd';
import { LockOutlined, GlobalOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import styles from './index.module.scss';
import type { Course, EditCourseFormValues } from 'entities/Course';
import { useCourseTeacherStore } from 'entities/Course/stores/course.teacher.store.ts';
import { DeleteCourseButton } from 'features/DeleteCourseButton';

export const EditCourseForm: FC = () => {
  const { message } = App.useApp();

  const [form] = Form.useForm();
  const [isPrivateCourse, setIsPrivateCourse] = useState(false);

  const { isLoading, course, editCourse } = useCourseTeacherStore();

  const resetFields = useCallback(() => {
    if (course) {
      const formValues: Partial<EditCourseFormValues> = {
        title: course.title,
        description: course.description,
        keyword: course.keyword,
      };
      setIsPrivateCourse(course.isPrivateCourse);
      form.setFieldValue('isPrivateCourse', course.isPrivateCourse);
      form.setFieldsValue(formValues);
    }
  }, [course, form]);

  const formValues = Form.useWatch([], form);

  const isDisabled = useMemo<boolean>(() => {
    if (!course || !formValues) return true;

    for (const fieldName in formValues) {
      const formValue = formValues[fieldName];
      const courseValue = course[fieldName as keyof Course];
      if (formValue == null && courseValue == null) continue;
      if (formValue !== courseValue) return false;
    }

    return true;
  }, [course, formValues]);

  useEffect(() => {
    resetFields();
  }, [resetFields]);

  const handleSubmit: FormProps<EditCourseFormValues>['onFinish'] = async (values) => {
    try {
      if (course) {
        editCourse(course?.id, values).then(() => message.info('Курс успешно изменен'));
      }
    } catch (error: any) {
      const data = error?.response?.data?.data;
      if (data && typeof data === 'object') {
        const fieldErrors = Object.entries(data).map(([field, message]) => ({
          name: field === 'capacity' ? 'quantity' : field,
          errors: [String(message)],
        }));

        form.setFields(fieldErrors);
      }
    }
  };

  const handleValuesChange = (changedValues: Partial<EditCourseFormValues>) => {
    if ('isPrivateCourse' in changedValues) {
      setIsPrivateCourse(changedValues.isPrivateCourse ?? false);

      if (!changedValues.isPrivateCourse) {
        form.setFieldValue('keyword', undefined);
      }
    }
  };

  return (
    <Card title="Редактирование курса" className={styles.card}>
      <Form<EditCourseFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        className={styles.form}
        initialValues={{
          title: '',
          description: '',
          isPrivateCourse: false,
          keyword: '',
        }}
      >
        {/* Название курса */}
        <Form.Item
          label="Название курса"
          name="title"
          rules={[
            { required: true, message: 'Пожалуйста, введите название курса' },
            { min: 3, message: 'Название должно содержать минимум 3 символа' },
            { max: 100, message: 'Название не должно превышать 100 символов' },
          ]}
        >
          <Input placeholder="Введите название курса" size="large" className={styles.input} />
        </Form.Item>

        {/* Описание курса */}
        <Form.Item
          label="Описание курса"
          name="description"
          rules={[
            { message: 'Пожалуйста, введите описание курса' },
            { min: 10, message: 'Описание должно содержать минимум 10 символов' },
            { max: 1000, message: 'Описание не должно превышать 1000 символов' },
          ]}
        >
          <Input.TextArea
            placeholder="Опишите содержание и цели курса"
            rows={4}
            className={styles.textarea}
            showCount
            maxLength={1000}
          />
        </Form.Item>

        {/* Приватный курс */}
        <Form.Item
          label="Приватный курс"
          name="isPrivateCourse"
          valuePropName="checked"
          className={styles.switchItem}
        >
          <Switch
            checkedChildren={<LockOutlined />}
            unCheckedChildren={<GlobalOutlined />}
            className={styles.switch}
          />
        </Form.Item>

        {/* Кодовое слово (только для приватных курсов) */}
        {isPrivateCourse && (
          <Form.Item
            label="Кодовое слово для доступа"
            name="keyword"
            rules={[
              { required: true, message: 'Пожалуйста, введите кодовое слово' },
              { min: 4, message: 'Кодовое слово должно содержать минимум 4 символа' },
              { max: 20, message: 'Кодовое слово не должно превышать 20 символов' },
            ]}
            className={styles.keywordItem}
          >
            <Input.Password
              placeholder="Введите кодовое слово для доступа к курсу"
              size="large"
              className={styles.input}
              visibilityToggle
            />
          </Form.Item>
        )}
        <Divider />
        {/* Кнопки действий */}
        <Form.Item className={styles.actions}>
          <Space size="middle">
            <DeleteCourseButton id={course?.id} />
            <Button htmlType="button" size="large" onClick={resetFields} disabled={isDisabled}>
              Сбросить
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={isLoading}
              disabled={isDisabled}
            >
              Сохранить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
