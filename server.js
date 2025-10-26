const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정 - 모든 도메인 허용 (나중에 특정 도메인만 허용하도록 변경 가능)
app.use(cors());
app.use(express.json());

// 환경변수에서 Google Apps Script URL 가져오기
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const VERIFICATION_URL = process.env.VERIFICATION_URL;

// 환경변수 확인
if (!GOOGLE_SCRIPT_URL || !VERIFICATION_URL) {
    console.error('❌ 오류: .env 파일에 GOOGLE_SCRIPT_URL과 VERIFICATION_URL을 설정해주세요!');
    process.exit(1);
}

// 1. 이메일 인증 API
app.post('/api/verify-email', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: '이메일을 입력해주세요' 
            });
        }

        // Google Apps Script로 전달
        const response = await axios.post(
            `${VERIFICATION_URL}?email=${encodeURIComponent(email)}`,
            {
                action: 'verify',
                email: email
            },
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        );

        // 응답 그대로 돌려주기
        res.json(response.data);

    } catch (error) {
        console.error('이메일 인증 오류:', error.message);
        res.status(500).json({ 
            success: false, 
            error: '이메일 인증 중 오류가 발생했습니다' 
        });
    }
});

// 2. 알람 등록 API
app.post('/api/register', async (req, res) => {
    try {
        const { email, youtubeApiKey, geminiApiKey, sendTime, channels } = req.body;

        // 기본 검증
        if (!email || !youtubeApiKey || !geminiApiKey || !sendTime || !channels) {
            return res.status(400).json({ 
                success: false, 
                error: '모든 필드를 입력해주세요' 
            });
        }

        // Google Apps Script로 전달
        const response = await axios.post(
            GOOGLE_SCRIPT_URL,
            {
                email: email,
                youtubeApiKey: youtubeApiKey,
                geminiApiKey: geminiApiKey,
                sendTime: sendTime,
                channels: channels
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // 응답 그대로 돌려주기
        res.json({ success: true, message: '등록이 완료되었습니다' });

    } catch (error) {
        console.error('알람 등록 오류:', error.message);
        res.status(500).json({ 
            success: false, 
            error: '알람 등록 중 오류가 발생했습니다' 
        });
    }
});

// 3. 알람 취소 API
app.post('/api/cancel', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                error: '이메일을 입력해주세요' 
            });
        }

        // Google Apps Script로 삭제 요청 전달
        const response = await axios.post(
            GOOGLE_SCRIPT_URL,
            {
                action: 'delete',
                email: email
            },
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        );

        // 응답 그대로 돌려주기
        res.json(response.data);

    } catch (error) {
        console.error('알람 취소 오류:', error.message);
        res.status(500).json({ 
            success: false, 
            error: '알람 취소 중 오류가 발생했습니다' 
        });
    }
});

// 서버 상태 확인 API (테스트용)
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: '백엔드 서버가 정상 작동 중입니다',
        timestamp: new Date().toISOString()
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`✅ 백엔드 서버가 포트 ${PORT}에서 실행 중입니다`);
    console.log(`🌐 http://localhost:${PORT}`);
});

module.exports = app;
