import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Divider,
  CircularProgress,
  Link,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const primaryColor = '#983ca4';

interface Link {
  url: string;
  text: string;
}

type MessageType = 'user' | 'bot';

interface Message {
  type: MessageType;
  text: string;
  links?: Link[];
}

const ALL_CHAT_STYLES = {
  user: {
    background: '#f0e6ff',
    color: primaryColor,
    alignSelf: 'flex-end',
    borderRadius: '16px 16px 0 16px',
  },
  bot: {
    background: '#ffffff',
    color: '#333',
    alignSelf: 'flex-start',
    borderRadius: '16px 16px 16px 0',
  },
};

const ChatBot: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: query }]);
    setLoading(true);

    const socket = new WebSocket("ws://127.0.0.1:5001/ask");
    let response = '';

    socket.onopen = () => {
      socket.send(JSON.stringify({ query }));
      setMessages(prev => [...prev, { type: 'bot', text: 'Let me look that up for you!' }]);
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.done) {
        socket.close();
        setLoading(false);
      } else if (data.links) {
        const processedLinks = data.links.map((link: string) => {
          let domain;
          try {
            domain = new URL(link).hostname;
          } catch {
            domain = link.replace(/^https?:\/\//, '').split('/')[0];
          }
          return { url: link, text: domain };
        });
        setMessages(prev => {
          const msgs = [...prev];
          const last = msgs[msgs.length - 1];
          if (last.type === 'bot') last.links = processedLinks;
          return msgs;
        });
      } else {
        response += data.response;
        setMessages(prev => {
          const msgs = [...prev];
          const last = msgs[msgs.length - 1];
          if (last.type === 'bot') last.text = response;
          return msgs;
        });
      }
    };

    setQuery('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const renderFormatted = (text: string) =>
    text.split('\n').map((line, i) => (
      <Typography key={i} sx={{ mb: 0.5 }}>
        {line.split(/(\*\*.*?\*\*)/g).map((part, j) =>
          /^\*\*/.test(part)
            ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong>
            : <span key={j}>{part}</span>
        )}
      </Typography>
    ));

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          bgcolor: '#f5f2ff',
          borderRadius: 3,
          mb: 2,
          height: 400,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {messages.map((msg, idx) => (
          <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', alignItems: msg.type === 'user' ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ ...ALL_CHAT_STYLES[msg.type], p: 1.5, maxWidth: '80%' }}>
              {renderFormatted(msg.text)}
              {msg.links?.map((link, i) => (
                <Typography variant="caption" key={i} sx={{ display: 'block', mt: 0.5 }}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: primaryColor, textDecoration: 'none' }}
                  >
                    {link.text}
                  </a>
                </Typography>
              ))}
            </Box>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <CircularProgress size={20} sx={{ color: primaryColor }} />
          </Box>
        )}
      </Paper>

      <Divider />

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mt: 1 }}>
        <TextField
          inputRef={inputRef}
          multiline
          minRows={1}
          maxRows={4}
          placeholder="Ask me anything about Hunter College or the libraries!"
          value={query}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          size="small"
          sx={{
            mr: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#ffffff',
            },
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          sx={{
            bgcolor: primaryColor,
            '&:hover': { bgcolor: '#7a297f' },
            color: '#fff',
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>

      <Box sx={{ mt: 3, bgcolor: '#f3f3f3', p: 2, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ color: primaryColor, mb: 1 }}>
          Hunter College Resources
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Looking for library resources? Here are some helpful links:
        </Typography>
        <Box>
          <Link
            href="https://library.hunter.cuny.edu/"
            target="_blank"
            sx={{
              display: 'block',
              color: primaryColor,
              textDecoration: 'none',
              mb: 0.5,
            }}
          >
            Hunter College Library
          </Link>
          <Link
            href="https://library.hunter.cuny.edu/remote-access/"
            target="_blank"
            sx={{
              display: 'block',
              color: primaryColor,
              textDecoration: 'none',
            }}
          >
            Remote Access to Library Services
          </Link>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Want to learn more about campus events? Check out the latest:
        </Typography>
        <Link
          href="https://www.hunter.cuny.edu/news"
          target="_blank"
          sx={{
            display: 'block',
            color: primaryColor,
            textDecoration: 'none',
            mt: 0.5,
          }}
        >
          Hunter College News and Events
        </Link>
      </Box>
    </Box>
  );
};

export default ChatBot;
