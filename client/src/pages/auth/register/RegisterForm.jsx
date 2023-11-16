import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../redux/slice/login.slice'
import { useNavigate } from 'react-router-dom'

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 16,
  },
}

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const registerStatus = useSelector((state) => state.authentication.registerStatus)

  const handleRegister = (data) => {
    dispatch(register(data))
  }

  useEffect(() => {
    if (registerStatus === 'success') {
      navigate('/login')
    }
  }, [handleRegister])

  return (
    <div>
      <Form {...layout} onFinish={handleRegister}>
        <Form.Item
          name={'username'}
          label='Username'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input placeholder='Input username' />
        </Form.Item>
        <Form.Item
          name={'password'}
          label='Password'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <Input.Password placeholder='Input password' />
        </Form.Item>
        <Form.Item
          name={'confirmPassword'}
          label='Confirm Password'
          rules={[
            {
              required: true,
              message: 'This field is required',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('not match password'))
              },
            }),
          ]}
        >
          <Input.Password placeholder='Input password' />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            register
          </Button>
        </Form.Item>
      </Form>
      <span onClick={() => navigate('/login')}>Login</span>
    </div>
  )
}

export default RegisterForm