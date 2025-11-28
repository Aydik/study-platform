import { type FC, useState } from 'react';
import styles from './index.module.scss';
import { Icon } from 'shared/ui/Icon';
import { Typography } from 'antd';
import { ConfirmModal } from 'shared/ui/ConfirmModal';
import { useAuthStore } from 'features/auth';
import { useNavigate } from 'react-router-dom';

export const LogoutButton: FC = () => {
  const { logout } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    logout().then(() => {
      setIsModalOpen(false);
      navigate('/auth/login');
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.logoutButton} onClick={showModal}>
        <Icon name="logout" />
        <Typography.Text>Выйти</Typography.Text>
      </button>
      <ConfirmModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Вы действительно хотите выйти?"
      />
    </>
  );
};
