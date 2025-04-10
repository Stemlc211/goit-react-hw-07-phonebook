import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState(''); // Starea pentru mesajele de eroare

  // Definirea referințelor pentru câmpurile de input
  const nameInputRef = useRef(null);
  const numberInputRef = useRef(null);

  const handleChange = event => {
    const { name, value } = event.target;

    // Resetează mesajul de eroare atunci când utilizatorul începe să tasteze
    setError('');

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Validare număr de telefon cu regex
    const phoneRegex = /^\d{3}-\d{2}-\d{2}$|^\d{10,14}$/;
    if (!phoneRegex.test(number)) {
      setError('The phone number is not in the correct format.'); // Mesaj de eroare
      return;
    }

    onAddContact(name, number);

    // Resetează formularul
    setName('');
    setNumber('');
    setError(''); // Curăță mesajul de eroare

    // Setează focusul pe câmpul "Name"
    nameInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formclass}>
      <label className={styles.labelclass}>
        Name
        <input
          className={styles.inputclass}
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Mara, Stella Artois, Bill Gates."
          required
          value={name}
          onChange={handleChange}
          ref={nameInputRef} // Atribuie referința la câmpul "Name"
          placeholder="Ex: Jack Sparrow"
        />
      </label>
      <label className={styles.labelclass}>
        Number
        <input
          className={styles.inputclass}
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes or parentheses."
          required
          value={number}
          onChange={handleChange}
          ref={numberInputRef} // Atribuie referința la câmpul "Number"
          placeholder="Ex: 123-44-56"
        />
      </label>
      {/* Afișează mesajul de eroare, dacă există */}
      {error && <p className={styles.errorMessage}>{error}</p>}

      <button type="submit" className={styles.buttonclass}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
