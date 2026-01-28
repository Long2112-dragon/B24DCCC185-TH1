import React, { useState, useEffect } from 'react';
import { Input, Button, Card, Typography, message, Space, Alert } from 'antd';

const { Title, Paragraph } = Typography;

const GuessNumberGame: React.FC = () => {
  const [target, setTarget] = useState<number>(0); // Số ngẫu nhiên hệ thống sinh
  const [guess, setGuess] = useState<string>(''); // Số người chơi nhập
  const [attempts, setAttempts] = useState<number>(0); // Số lần đã đoán
  const [feedback, setFeedback] = useState<string>(''); // Thông báo phản hồi
  const [status, setStatus] = useState<'success' | 'info' | 'error' | 'warning'>('info');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Khởi tạo trò chơi mới
  const startNewGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setAttempts(0);
    setGuess('');
    setFeedback('Hệ thống đã chọn một số từ 1 đến 100. Mời bạn đoán!');
    setStatus('info');
    setIsGameOver(false);
  };

  useEffect(() => { startNewGame(); }, []);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      return message.warning('Vui lòng nhập số hợp lệ từ 1 đến 100!');
    }

    const currentAttempts = attempts + 1;
    setAttempts(currentAttempts);

    if (num === target) {
      setFeedback('Chúc mừng! Bạn đã đoán đúng!');
      setStatus('success');
      setIsGameOver(true);
    } else if (currentAttempts >= 10) {
      setFeedback(`Bạn đã hết lượt! Số đúng là ${target}.`);
      setStatus('error');
      setIsGameOver(true);
    } else {
      if (num < target) {
        setFeedback('Bạn đoán quá thấp!');
        setStatus('warning');
      } else {
        setFeedback('Bạn đoán quá cao!');
        setStatus('warning');
      }
    }
    setGuess('');
  };

  return (
    <Card title="Bài 1: Trò chơi đoán số" style={{ maxWidth: 600, margin: '20px auto' }}>
      <Title level={4} style={{ textAlign: 'center' }}>Đoán số từ 1 đến 100</Title>
      <Paragraph style={{ textAlign: 'center' }}>Số lượt đã dùng: <b>{attempts}/10</b></Paragraph>
      
      <Alert message={feedback} type={status} showIcon style={{ marginBottom: 20 }} />

      <Space direction="vertical" style={{ width: '100%' }}>
        <Input 
          size="large"
          type="number" 
          value={guess} 
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Nhập số của bạn..."
          disabled={isGameOver}
          onPressEnter={handleGuess}
        />
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Button type="primary" size="large" onClick={handleGuess} disabled={isGameOver}>
            Đoán số
          </Button>
          <Button size="large" onClick={startNewGame} style={{ marginLeft: 10 }}>
            Chơi lại
          </Button>
        </div>
      </Space>
    </Card>
  );
};

export default GuessNumberGame;