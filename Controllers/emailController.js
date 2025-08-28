const nodemailer=require("nodemailer")

const transpoter=nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendRegisterEmailToUser = ({ clientemail,name }, res) => {

  const customerMailOptions = {
    from: `"Superior" <${process.env.EMAIL_USER}>`,
    to: clientemail,
    subject: `Successful Register ${name}`,
    html: `
     <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Thank You</title>

<style>
  /* Page */
  body {
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
    background: #f6f9fc;
    display: flex; 
    align-items: center; 
    justify-content: center; 
    min-height: 100vh;
  }

  /* Card */
  .card {
    background: #fff;
    padding: 28px 28px 34px;
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    text-align: center;
    width: 92%;
    max-width: 420px;
    animation: pop 420ms ease-out;
  }

  /* Check circle */
  .check-wrap {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    margin: 10px auto 18px;
    background: #e6f7ec;
    display: grid;
    place-items: center;
    animation: ring 900ms ease-out;
  }

  /* Animated check (SVG stroke animation) */
  svg {
    width: 58px;
    height: 58px;
    display: block;
  }
  .check {
    fill: none;
    stroke: #22c55e;                 /* green */
    stroke-width: 6;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 48;            /* total path length approx */
    stroke-dashoffset: 48;           /* hidden initially */
    animation: draw 650ms 200ms ease forwards;
  }

  /* Text */
  h1 {
    margin: 4px 0 8px;
    font-size: 1.6rem;
    color: #0f172a;
  }
  p {
    margin: 0;
    color: #475569;
    line-height: 1.5;
  }

  /* Button (optional) */
  .btn {
    margin-top: 18px;
    display: inline-block;
    padding: 10px 16px;
    border-radius: 999px;
    background: #22c55e;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
    box-shadow: 0 6px 16px rgba(34,197,94,0.35);
  }
  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); opacity: 0.9; }

  /* Animations */
  @keyframes draw {
    to { stroke-dashoffset: 0; }
  }
  @keyframes pop {
    0% { transform: scale(.96); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes ring {
    0% { transform: scale(.7); opacity: 0; }
    60% { transform: scale(1.08); opacity: 1; }
    100% { transform: scale(1); }
  }
</style>
</head>
<body>
  <div class="card">
    <div class="check-wrap" aria-hidden="true">
      <!-- Simple checkmark path -->
      <svg viewBox="0 0 24 24">
        <path class="check" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <h1>Thank You for Registering!</h1>
    <p>Your account has been created successfully.<br/>You can now continue to your dashboard.</p>

    <a class="btn" href="#">Go to Dashboard</a>
  </div>
</body>
</html>
 
    `,
  };

  transpoter.sendMail(customerMailOptions, (error, info) => {
    if (error) {
      console.error("Error sending login email:", error);
      return res.status(500).json({ status: 500, message: "Error sending login email" });
    }
    return res.status(200).json({ status: 200, message: "Register success email sent successfully" });
  });
};
module.exports={sendRegisterEmailToUser}