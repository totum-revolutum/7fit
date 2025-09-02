import React, { useState } from "react";
import { Button } from "@components/shared/Button";
import styles from "./Feedback.module.scss";
import { useFeedbackStore } from "@stores/useFeedbackStore";
import { sendContactToSupabase, sendContactToTelegram } from "@api/feedbackApi";

const Feedback = () => {
  const { name, phone, errors, setName, setPhone, validate, reset, setErrors } =
    useFeedbackStore();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e) => {
    const { name: fieldName, value } = e.target;
    if (fieldName === "name") setName(value);
    if (fieldName === "phone") setPhone(value);
    setErrors({ ...errors, [fieldName]: undefined });
  };

  const submitContacts = async () => {
    if (!validate()) return;

    try {
      await sendContactToSupabase(name, phone);
      console.log("Заявка додана у Supabase");

      await sendContactToTelegram(name, phone);
      console.log("Дані надіслані на Telegram");

      setSuccessMessage("✅ Заявку відправлено!");
      setTimeout(() => setSuccessMessage(null), 2000);
    } catch (error) {
      console.error("Помилка:", error);
    } finally {
      reset();
    }
  };

  return (
    <section id="feedback" className={styles.feedbackWrapper}>
      <div className={styles.bg}></div>
      <div className={styles.contactUs}>
        <div className={styles.contactUs__title}>
          Залишились питання? Зв’яжіться з нами
        </div>
        <div className={styles.contactUs__form}>
          <div className={styles.contactUs__form__inputWrapper}>
            <input
              name="phone"
              type="tel"
              placeholder="+380*********"
              className={styles.input}
              value={phone}
              onChange={handleChange}
            />
            <div
              className={`${styles.error} ${
                errors.phone ? styles.visible : styles.hidden
              }`}
            >
              {errors.phone}
            </div>
          </div>
          <div className={styles.contactUs__form__inputWrapper}>
            <input
              name="name"
              type="text"
              placeholder="Ім’я"
              className={styles.input}
              value={name}
              onChange={handleChange}
            />
            <div
              className={`${styles.error} ${
                errors.name ? styles.visible : styles.hidden
              }`}
            >
              {errors.name}
            </div>
          </div>
        </div>
        <Button textType="SEND" onClick={submitContacts} />

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
      </div>
    </section>
  );
};

export default Feedback;
