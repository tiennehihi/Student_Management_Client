// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { sendPost } from '../../utils/httpUtil';

// const CreateTranscript = ({ show, onHide, onSave }) => {
//     const [newTranscript, setNewTranscript] = useState({ studentId: '', semesterId: '', gpa: '' });

//     const handleSave = async () => {
//         try {
//             await sendPost('http://localhost:8080/api/transcript/create', newTranscript);
//             onSave();
//             onHide();
//         } catch (error) {
//             console.error('Error creating transcript:', error.message);
//         }
//     };

//     return (
//         <Modal show={show} onHide={onHide}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add New Transcript</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Student ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={newTranscript.studentId}
//                             onChange={(e) => setNewTranscript({ ...newTranscript, studentId: e.target.value })}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Semester ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={newTranscript.semesterId}
//                             onChange={(e) => setNewTranscript({ ...newTranscript, semesterId: e.target.value })}
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>GPA</Form.Label>
//                         <Form.Control
//                             type="number"
//                             value={newTranscript.gpa}
//                             onChange={(e) => setNewTranscript({ ...newTranscript, gpa: e.target.value })}
//                         />
//                     </Form.Group>
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onHide}>Close</Button>
//                 <Button variant="primary" onClick={handleSave}>Create Transcript</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default CreateTranscript;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendPost, sendGet } from '../../utils/httpUtil';

const CreateTranscript = ({ show, onHide, onSave }) => {
    const [newTranscript, setNewTranscript] = useState({ studentId: '', semesterId: '', gpa: '' });
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await sendGet('http://localhost:8080/api/user/getAll');
                const data = JSON.parse(response);
                setStudents(data.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        const fetchSemesters = async () => {
            try {
                const response = await sendGet('http://localhost:8080/api/semester/getAll');
                const data = JSON.parse(response);
                setSemesters(data.data);
            } catch (error) {
                console.error('Error fetching semesters:', error);
            }
        };

        fetchStudents();
        fetchSemesters();
    }, []);

    const handleSave = async () => {
        try {
            await sendPost('http://localhost:8080/api/transcript/create', newTranscript);
            onSave();
            onHide();
        } catch (error) {
            console.error('Error creating transcript:', error.message);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thêm Bảng Điểm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Sinh Viên</Form.Label>
                        <Form.Control
                            as="select"
                            value={newTranscript.studentId}
                            onChange={(e) => setNewTranscript({ ...newTranscript, studentId: e.target.value })}
                        >
                            <option value="">Chọn Sinh Viên</option>
                            {students.map((student) => (
                                <option key={student._id} value={student._id}>
                                    {student.fullname}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Kì Học</Form.Label>
                        <Form.Control
                            as="select"
                            value={newTranscript.semesterId}
                            onChange={(e) => setNewTranscript({ ...newTranscript, semesterId: e.target.value })}
                        >
                            <option value="">Chọn Kì Học</option>
                            {semesters.map((semester) => (
                                <option key={semester._id} value={semester._id}>
                                    {semester.semester}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>GPA</Form.Label>
                        <Form.Control
                            type="number"
                            value={newTranscript.gpa}
                            onChange={(e) => setNewTranscript({ ...newTranscript, gpa: e.target.value })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Đóng</Button>
                <Button variant="primary" onClick={handleSave}>Thêm</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateTranscript;
