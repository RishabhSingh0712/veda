from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# ---------- Email Config ----------
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASS = os.getenv("SENDER_PASS")
CEO_EMAIL = os.getenv("CEO_EMAIL")

@app.route("/api/contact", methods=["POST"])
def contact():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        phone = data.get("phone")
        message = data.get("message")

        # --- Prepare Email ---
        subject = "New Contact Form Submission - VEDA VFX"
        body = f"""
        <h3>New Contact Inquiry</h3>
        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Phone:</b> {phone}</p>
        <p><b>Message:</b> {message}</p>
        """

        msg = MIMEMultipart()
        msg["From"] = SENDER_EMAIL
        msg["To"] = CEO_EMAIL
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "html"))

        # --- Send Mail ---
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASS)
        server.sendmail(SENDER_EMAIL, CEO_EMAIL, msg.as_string())
        server.quit()

        return jsonify({
            "status": "success",
            "message": "Thank you for connecting with VEDA VFX.Your inquiry has been received, and our team will respond shortly."
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
