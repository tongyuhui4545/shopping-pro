import { useNavigate, Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { toast } from 'react-toastify'
import { useUpdateUserMutation, useGetUserDetailsQuery } from '../slices/usersApiSlice'

const UserEditScreen = () => {
    const { id: userId } = useParams(); 
    

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);

    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ userId, name, email, isAdmin });
            toast.success("User updated");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <>
            <Link to="/admin/userlist" className="btn btn-light my-3">Go back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}

                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form>
                        {/* name */}
                        <Form.Group controlId='name' className='my-2'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter name' value={name} onChange={e => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price' className='my-2'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Enter price' value={email} onChange={e => setEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='isAdmin' className='my-2'>
                            <Form.Check type='checkbox' label='IsAdmin' value={isAdmin} onChange={e => setIsAdmin(e.target.value)}>
                            </Form.Check>
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='primary'
                            className='my-2'
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen