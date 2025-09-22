'use client';
import Link from 'next/link';

export default function LabsPage() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '36px', 
        fontWeight: 'bold', 
        marginBottom: '20px',
        color: '#333'
      }}>
        Web Development
      </h1>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        border: '1px solid #ddd'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
          Student Information
        </h2>
        <p style={{ fontSize: '16px', marginBottom: '5px' }}>
          <strong>Name:</strong> Divyam Chiragkumar Patel
        </p>
        <p style={{ fontSize: '16px', marginBottom: '5px' }}>
          <strong>NUID:</strong> 002593641
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
          Lab Assignments
        </h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ marginBottom: '15px' }}>
            <Link 
              href="/" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'underline', 
                fontSize: '16px'
              }}
            >
              Kambaz Application
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
          Lab Exercises
        </h2>
        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          <li style={{ marginBottom: '0' }}>
            <Link 
              href="/labs/lab1" 
              style={{ 
                color: '#007bff', 
                textDecoration: 'underline', 
                fontSize: '16px'
              }}
            >
              Lab Exercise 1
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
          Source Code Repositories
        </h2>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          <li style={{ marginBottom: '15px' }}>
            <a 
              href="https://github.com/Divyam6255/kambaz-next-js" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: '#007bff', 
                textDecoration: 'underline', 
                fontSize: '16px'
              }}
            >
              Kambaz Application Repository
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}