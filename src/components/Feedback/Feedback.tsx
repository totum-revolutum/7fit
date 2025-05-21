import React from "react";
import { Button } from "@components/shared/Button";
import styles from "./Feedback.module.scss";
import { useState } from "react";

const Feedback = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Будь ласка, введіть ім'я.";
    }

    const phoneRegex = /^\+380\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Будь ласка, введіть номер телефону.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Номер телефону має бути у форматі +380*********";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitContacts = () => {
    if (!validate()) return;

    console.log("Ім'я:", formData.name);
    console.log("Телефон:", formData.phone);

    setFormData({ name: "", phone: "" });
    setErrors({});
  };

  return (
    <section id="feedback" className={styles.feedbackWrapper}>
      <div className={styles.bg}></div>
      <div className={styles.contactUs}>
        <div className={styles.contactUs__title}>
          Залишились питання? Зв’яжіться з нами
        </div>
        <div className={styles.contactUs__form}>
          <div>
            <input
              name="phone"
              type="tel"
              placeholder="+380*********"
              className={styles.input}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className={styles.error}>{errors.phone}</div>}
          </div>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Ім’я"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
        </div>

        <Button textType="SEND" onClick={submitContacts} />
      </div>
    </section>
  );
};

export default Feedback;
