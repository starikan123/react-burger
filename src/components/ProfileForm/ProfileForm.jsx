import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { updateUserProfile } from "../../services/actions/profileForm";
import styles from "./ProfileForm.module.css";

function ProfileForm() {
  const userName = useSelector((store) => store.Auth.user?.name || "");
  const userEmail = useSelector((store) => store.Auth.user?.email || "");
  const [nameValue, setNameValue] = useState(userName);
  const [emailValue, setEmailValue] = useState(userEmail);
  const [passwordValue] = useState("*******");
  const dispatch = useDispatch();
  const isModified = userName !== nameValue || userEmail !== emailValue;

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const handleSaveClick = () => {
    dispatch(updateUserProfile(nameValue, emailValue));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSaveClick();
  };

  const handleCancelClick = () => {
    setNameValue(userName);
    setEmailValue(userEmail);
  };

  useEffect(() => {
    setNameValue(userName);
    setEmailValue(userEmail);
  }, [userName, userEmail]);

  return (
    <div className={styles.profileSection}>
      <form className={styles.profileForm} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          icon="EditIcon"
          value={nameValue}
          onChange={handleNameChange}
          placeholder="Имя"
        />
        <EmailInput
          isIcon={true}
          value={emailValue}
          onChange={handleEmailChange}
        />
        <PasswordInput icon="EditIcon" value={passwordValue} disabled={true} />
        <div>
          <Button
            disabled={!isModified}
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass={styles.saveButton}
          >
            Сохранить
          </Button>
          <Button
            style={{ padding: "0px 0px 0px 24px" }}
            cellSpacing={0}
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancelClick}
            extraClass={styles.cancelButton}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;
