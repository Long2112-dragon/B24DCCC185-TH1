import React, { useState, useEffect } from 'react';
import { Card, Input, Button, List, Checkbox, Space, Typography, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // 1. Đọc dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const data = localStorage.getItem('B24DCCC185_TODO');
    if (data) setTodos(JSON.parse(data));
  }, []);

  // 2. Lưu vào localStorage mỗi khi danh sách thay đổi
  useEffect(() => {
    localStorage.setItem('B24DCCC185_TODO', JSON.stringify(todos));
  }, [todos]);

  // Thêm mới
  const handleAdd = () => {
    if (!input.trim()) return;
    const newTodo: Todo = { id: Date.now().toString(), text: input, completed: false };
    setTodos([newTodo, ...todos]);
    setInput('');
  };

  // Xóa
  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Chỉnh sửa (Mở Modal)
  const showEditModal = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (id: string, newText: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));
    setEditingTodo(null);
  };

  return (
    <Card title="Bài 2: Quản lý TodoList" style={{ maxWidth: 700, margin: '20px auto' }}>
      <Space style={{ marginBottom: 20 }}>
        <Input 
          placeholder="Nhập công việc mới..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleAdd}
          style={{ width: 400 }}
        />
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm</Button>
      </Space>

      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="text" icon={<EditOutlined />} onClick={() => showEditModal(item)} />,
              <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item.id)} />
            ]}
          >
            <Checkbox 
              checked={item.completed} 
              onChange={() => {
                setTodos(todos.map(t => t.id === item.id ? { ...t, completed: !t.completed } : t));
              }}
            >
              <Typography.Text delete={item.completed} style={{ fontSize: 16 }}>
                {item.text}
              </Typography.Text>
            </Checkbox>
          </List.Item>
        )}
      />

      {/* Modal Chỉnh sửa */}
      <Modal
        title="Chỉnh sửa công việc"
        open={!!editingTodo}
        onOk={() => editingTodo && handleUpdate(editingTodo.id, editingTodo.text)}
        onCancel={() => setEditingTodo(null)}
      >
        <Input 
          value={editingTodo?.text} 
          onChange={(e) => editingTodo && setEditingTodo({...editingTodo, text: e.target.value})} 
        />
      </Modal>
    </Card>
  );
};

export default TodoListPage;