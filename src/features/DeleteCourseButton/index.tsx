import { type FC, useState } from 'react';
import { App, Button } from 'antd';
import { ConfirmModal } from 'shared/ui/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { deleteCourse } from 'entities/Course/services/course.teacher.service.ts';

interface Props {
  id?: string;
}

export const DeleteCourseButton: FC<Props> = ({ id }) => {
  const { message } = App.useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (id)
      deleteCourse(id).then(() => {
        setIsModalOpen(false);
        message.info('Курс успешно удален');
        navigate('/teacher');
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button danger onClick={showModal} disabled={id === undefined} size="large">
        Удалить
      </Button>
      <ConfirmModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Подтверждаете удаление курса?"
      />
    </>
  );
};
