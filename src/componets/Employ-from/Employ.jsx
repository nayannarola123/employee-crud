import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import getdata from '../js/main';
import generateUniqueId from 'generate-unique-id';


function FromEmploy() {
  const [input, setInput] = useState({
    id: '',
    fname: '',
    lname: '',
    age: '',
    email: '',
    pass: '',
    address: '',
  });

  const [storage, setStorage] = useState(getdata());

  const handleForm = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleEdit = (id) => {
    const record = storage.find((rec) => rec.id === id);
    setInput(record);
  };

  const handleRemove = (id) => {
    const removeData = storage.filter((rec) => rec.id !== id);
    setStorage(removeData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.id) {
      const updatedStorage = storage.map((record) => 
        record.id === input.id ? input : record
      );
      setStorage(updatedStorage);
    } else {
      const obj = {
        ...input,
        id: generateUniqueId({ length: 3, useLetters: false }),
      };
      setStorage([...storage, obj]);
    }

    setInput({
      id: '',
      fname: '',
      lname: '',
      age: '',
      email: '',
      pass: '',
      address: '',
    });
  };

  useEffect(() => {
    localStorage.setItem('EmployeeData', JSON.stringify(storage));
  }, [storage]);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4 text-black fw-bold">Employee Management System</h3>

      <Card className="mb-3 shadow-lg p-4 rounded">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Hidden Field for ID */}
              <Form.Group controlId="id" className="d-none">
                <Form.Control type="text" name="id" value={input.id} onChange={handleForm} />
              </Form.Group>

              {/* First Name */}
              <Form.Group as={Col} controlId="fname" className="mb-4 ">
                <Form.Label className="fw-bold">First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter First Name" 
                  name="fname" 
                  value={input.fname} 
                  onChange={handleForm} 
                  className="border-primary rounded-3 shadow-sm"
                />
              </Form.Group>
              </Row>

              {/* Last Name */}
              <Form.Group as={Col} controlId="lname" className="mb-4">
                <Form.Label className="fw-bold">Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter Last Name" 
                  name="lname" 
                  value={input.lname} 
                  onChange={handleForm} 
                  className="border-primary rounded-3 shadow-sm"
                />
              </Form.Group>
            

            {/* Age */}
            <Row >
            <Form.Group as={Col} controlId="age" className="mb-4">
              <Form.Label className="fw-bold">Age</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter Age" 
                name="age" 
                value={input.age} 
                onChange={handleForm} 
                className="border-primary rounded-3 shadow-sm"
              />
            </Form.Group>
            </Row>

            <Row >
              {/* Email */}
              <Form.Group as={Col} controlId="formGridEmail" className="mb-4">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter Email" 
                  name="email" 
                  value={input.email} 
                  onChange={handleForm} 
                  className="border-primary rounded-3 shadow-sm"
                />
              </Form.Group>
              </Row>

              {/* Password */}
              <Form.Group as={Col} controlId="formGridPassword" className="mb-4">
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter Password" 
                  name="pass" 
                  value={input.pass} 
                  onChange={handleForm} 
                  className="border-primary rounded-3 shadow-sm"
                />
              </Form.Group>
            

            {/* Address */}
            <Form.Group className="mb-4" controlId="formGridAddress1">
              <Form.Label className="fw-bold">Address</Form.Label>
              <Form.Control 
                placeholder="Enter Address" 
                name="address" 
                value={input.address} 
                onChange={handleForm} 
                className="border-primary rounded-3 shadow-sm"
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="px-5 py-2 rounded-pill shadow-lg">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Table responsive="md" className="table table-hover table-bordered mt-4">
  <thead className="bg-primary text-white">
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Age</th>
      <th>Email</th>
      <th>Password</th>
      <th>Address</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {storage.map((rec, index) => (
      <tr 
        key={rec.id} 
        className="align-middle" 
        style={{ transition: 'background-color 0.3s' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f8ff')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
      >
        <td>{index + 1}</td>
        <td>{rec.fname}</td>
        <td>{rec.lname}</td>
        <td>{rec.age}</td>
        <td>{rec.email}</td>
        <td>{rec.pass}</td>
        <td>{rec.address}</td>
        <td>
          <Button 
            variant="outline-warning" 
            size="sm" 
            onClick={() => handleEdit(rec.id)} 
            className="me-2"
          >
            <i className="bi bi-pencil-square"></i>
          </Button>
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => handleRemove(rec.id)}
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

    </div>
  );
}

export default FromEmploy;
