import type { FC } from 'react';
import { Button, Modal, type ModalProps, Typography } from 'antd';
import styles from './index.module.scss';

export const ConfirmModal: FC<ModalProps> = (props) => {
  return (
    <Modal
      {...props}
      width={360}
      title={<Typography.Text className={styles.title}>{props.title}</Typography.Text>}
      footer={
        <div className={styles.footer}>
          <Button onClick={props.onCancel}>Отмена</Button>
          <Button onClick={props.onOk} type="primary">
            Да
          </Button>
        </div>
      }
    />
  );
};
