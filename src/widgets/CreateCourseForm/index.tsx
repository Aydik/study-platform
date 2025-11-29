import { type FC, useState } from 'react';
import { Form, Input, Switch, Button, Card, Space, Divider } from 'antd';
import { LockOutlined, GlobalOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import styles from './index.module.scss';
import type { CreateCourseFormValues } from 'entities/Course';

export const CreateCourseForm: FC = () => {
  const [form] = Form.useForm();
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit: FormProps<CreateCourseFormValues>['onFinish'] = (values) => {
    console.log('Form values:', values);
  };

  const handleValuesChange = (changedValues: Partial<CreateCourseFormValues>) => {
    if ('isPrivate' in changedValues) {
      setIsPrivate(changedValues.isPrivate ?? false);

      if (!changedValues.isPrivate) {
        form.setFieldValue('accessCode', undefined);
      }
    }
  };

  return (
    <Card title="Создание курса" className={styles.card}>
      <Form<CreateCourseFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange}
        className={styles.form}
        initialValues={{
          title: '',
          description: '',
          isPrivate: false,
          accessCode: '',
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
          name="isPrivate"
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
        {isPrivate && (
          <Form.Item
            label="Кодовое слово для доступа"
            name="accessCode"
            rules={[
              { required: true, message: 'Пожалуйста, введите кодовое слово' },
              { min: 4, message: 'Кодовое слово должно содержать минимум 4 символа' },
              { max: 20, message: 'Кодовое слово не должно превышать 20 символов' },
              {
                pattern: /^[a-zA-Z0-9_-]+$/,
                message: 'Можно использовать только латинские буквы, цифры, дефисы и подчеркивания',
              },
            ]}
            className={styles.accessCodeItem}
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
            <Button type="primary" htmlType="submit" size="large" className={styles.submitButton}>
              Создать курс
            </Button>
            <Button
              htmlType="button"
              size="large"
              onClick={() => {
                form.resetFields();
                setIsPrivate(false);
              }}
              className={styles.resetButton}
            >
              Очистить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
