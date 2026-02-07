export default function Home() {
  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
    <h1 style={{ fontSize: 36, fontWeight: 'bold' }}>
    DataPulse
    </h1>

    <p style={{ marginTop: 16, fontSize: 18, maxWidth: 600 }}>
    DataPulse collects form submissions from any website and shows them in one simple dashboard.
    No complex analytics. No setup headaches.
    </p>

    <div style={{ marginTop: 24 }}>
    <a href="/dashboard">
    <button
    style={{
      padding: '12px 18px',
      fontSize: 16,
      cursor: 'pointer',
      border: '1px solid black',
      background: 'black',
      color: 'white',
    }}
    >
    Go to Dashboard
    </button>
    </a>
    </div>

    <div style={{ marginTop: 40, fontSize: 14, color: '#555' }}>
    <p>How it works:</p>
    <ol>
    <li>Paste our API endpoint into your website form</li>
    <li>Submit the form</li>
    <li>View submissions instantly in the dashboard</li>
    </ol>
    </div>
    </main>
  )
}
