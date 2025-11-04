const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerCitizen = async (req, res) => {
    try {
        const { firstName, middleName, lastName, dob, gender, phone, email, address, city, state, postalCode, aadharNumber, panNumber, password } = req.body;
        const [rows] = await db.query('SELECT COUNT(*) as count FROM Citizen');
        const citizenID = `CIT${String(rows[0].count + 1).padStart(3, '0')}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO Citizen (CitizenID, FirstName, MiddleName, LastName, DOB, Gender, Phone, Email, Address, City, State, PostalCode, AadharNumber, PanNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [citizenID, firstName, middleName, lastName, dob, gender, phone, email, address, city, state, postalCode, aadharNumber, panNumber]);
        const token = jwt.sign({ citizenID, email, type: 'citizen' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ message: 'Registration successful', citizenID, token });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

exports.loginCitizen = async (req, res) => {
    try {
        const { email, aadharNumber } = req.body;
        const [rows] = await db.query('SELECT * FROM Citizen WHERE Email = ? OR AadharNumber = ?', [email, aadharNumber]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        const citizen = rows[0];
        const token = jwt.sign({ citizenID: citizen.CitizenID, email: citizen.Email, name: `${citizen.FirstName} ${citizen.LastName}`, type: 'citizen' }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: 'Login successful', token, citizen: { citizenID: citizen.CitizenID, name: `${citizen.FirstName} ${citizen.LastName}`, email: citizen.Email } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await db.query('SELECT * FROM Admin_Users WHERE Username = ? AND IsActive = TRUE', [username]);
        if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
        const admin = rows[0];
        const isValid = await bcrypt.compare(password, admin.PasswordHash);
        if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
        await db.query('UPDATE Admin_Users SET LastLogin = NOW() WHERE AdminID = ?', [admin.AdminID]);
        const token = jwt.sign({ adminID: admin.AdminID, username: admin.Username, role: admin.Role, type: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' });
        res.json({ message: 'Admin login successful', token, admin: { adminID: admin.AdminID, username: admin.Username, fullName: admin.FullName, role: admin.Role } });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
};


