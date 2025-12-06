import { useState } from "preact/hooks";
import styles from "./ContactForm.module.css";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "100000",
    note: "",
  });

  const [emailError, setEmailError] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      if (emailError && validateEmail(value)) {
        setEmailError(false);
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (value && !validateEmail(value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError(true);
      return;
    }

    console.log("Form Submitted:", formData);
    alert("Thank you! We will get in touch with you.");
    // Reset form or handle actual submission logic here
    setFormData({
      name: "",
      email: "",
      amount: "100000",
      note: "",
    });
  };

  return (
    <form className={`${styles.formContainer} snap-section`} onSubmit={handleSubmit}>
      <div className={styles.inputsColumn}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            What is your name?
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            What is your email?
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`${styles.input} ${emailError ? styles.error : ""}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {emailError && (
            <span className={styles.errorMessage}>Please enter a valid email</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount" className={styles.label}>
            How much do you plan to invest?
          </label>
          <select
            id="amount"
            name="amount"
            className={styles.select}
            value={formData.amount}
            onChange={handleChange}
          >
            <option value="100000">$100,000</option>
            <option value="200000">$200,000</option>
            <option value="500000">$500,000</option>
            <option value="1000000">$1,000,000+</option>
          </select>
        </div>
      </div>

      <div className={styles.noteColumn}>
        <div className={`${styles.formGroup} ${styles.fullHeight}`}>
          <label htmlFor="note" className={styles.label}>
            Anything you'd like to add?
          </label>
          <textarea
            id="note"
            name="note"
            className={`${styles.textarea} ${styles.fullHeightInput}`}
            value={formData.note}
            onChange={handleChange}
            rows="4"
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
