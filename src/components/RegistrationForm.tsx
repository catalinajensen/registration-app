import { ref, push, child, update } from 'firebase/database';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

import { database } from '../firebase';

function RegistrationForm() {
  const [name, setName] = useState<string | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [phone, setPhone] = useState<number | undefined>();
  const [validated, setValidated] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const clearRefs = () => {
    if (nameRef.current) {
      nameRef.current.value = '';
    }
    if (ageRef.current) {
      ageRef.current.value = '';
    }
    if (phoneRef.current) {
      phoneRef.current.value = '';
    }
  };

  const clearForm = (): void => {
    setName(undefined);
    setAge(undefined);
    setPhone(undefined);
    setValidated(false);
    setIsSaved(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ): void => {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    const user = {
      name,
      age,
      phone
    };

    const newPostKey = push(child(ref(database), 'posts')).key;
    const path = '/' + newPostKey;
    const updates = {
      [path]: user
    };

    update(ref(database), updates)
      .then(() => {
        setIsSaved(true);

        const interval = setInterval(() => {
          clearForm();
          clearRefs();
        }, 3000);
        return () => {
          clearInterval(interval);
        };
      })
      .catch((e) => console.log('error', e));
  };

  return (
    <Container className="mb-4">
      <Form
        style={{ width: 500 }}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <FloatingLabel
          controlId="floatingInputName"
          label="Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Name"
            required
            ref={nameRef}
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInputAge"
          label="Age"
          className="mb-3"
        >
          <Form.Control
            type="number"
            placeholder="Age"
            min={0}
            required
            ref={ageRef}
            defaultValue={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInputPhone"
          label="Phone number"
          className="mb-3"
        >
          <Form.Control
            type="tel"
            pattern="[0-9]{3}[0-9]{2}[0-9]{3}"
            placeholder="Phone"
            required
            ref={phoneRef}
            defaultValue={phone}
            onChange={(e) => setPhone(+e.target.value)}
          />
        </FloatingLabel>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {isSaved && (
        <ToastContainer className="pt-3">
          <Toast bg="success">
            <Toast.Body>You are registered</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </Container>
  );
}

export default RegistrationForm;
