import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type User = {
  name: string;
  age: number;
  phone: number;
};

function Users() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const cartRef = ref(database);
    onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        const result = Object.values(data) as User[];
        if (result.length) {
          setUsers(result);
        }
      } else {
        console.log('Data not found');
      }
    });
  }, []);

  return (
    <>
      {users?.length ? (
        <Container className="mb-4">
          <Row>
            <Col>Name</Col>
            <Col>Age</Col>
            <Col>Phone</Col>
          </Row>
          {users.map((user, index) => {
            return (
              <Row key={index}>
                <Col>{user.name}</Col>
                <Col>{user.age}</Col>
                <Col>{user.phone}</Col>
              </Row>
            );
          })}
        </Container>
      ) : (
        <h2>No users registered</h2>
      )}
    </>
  );
}

export default Users;
