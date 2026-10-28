const http = require('http');
require('dotenv').config({ path: __dirname + '/.env' });
const app = require('./src/app');

const PORT = 5055;
let server;
let adminToken = '';
let createdProjectId = '';

const runTests = async () => {
  console.log('🧪 Starting Portfolio Backend Automated API Test Suite...\n');

  server = app.listen(PORT, async () => {
    const baseUrl = `http://localhost:${PORT}/api`;
    let passed = 0;
    let failed = 0;

    const assert = (condition, description) => {
      if (condition) {
        console.log(`  ✅ PASS: ${description}`);
        passed++;
      } else {
        console.error(`  ❌ FAIL: ${description}`);
        failed++;
      }
    };

    try {
      // 1. GET /api/health
      console.log('1️⃣ Testing Health Endpoint...');
      const healthRes = await fetch(`${baseUrl}/health`);
      const healthData = await healthRes.json();
      assert(healthRes.status === 200, 'GET /api/health returns HTTP 200');
      assert(healthData.status === 'healthy', 'Health status is "healthy"');
      assert(typeof healthData.uptimeSeconds === 'number', 'Health includes uptime seconds');

      // 2. GET /api/projects
      console.log('\n2️⃣ Testing Projects Query...');
      const projectsRes = await fetch(`${baseUrl}/projects`);
      const projectsData = await projectsRes.json();
      assert(projectsRes.status === 200, 'GET /api/projects returns HTTP 200');
      assert(Array.isArray(projectsData.data), 'GET /api/projects returns array of projects');
      assert(projectsData.data.length > 0, `Returned ${projectsData.data.length} projects`);

      const firstProject = projectsData.data[0];
      const testProjectId = firstProject._id || firstProject.slug;

      // 3. GET /api/projects/:id
      console.log(`\n3️⃣ Testing Single Project Query (${testProjectId})...`);
      const singleRes = await fetch(`${baseUrl}/projects/${testProjectId}`);
      const singleData = await singleRes.json();
      assert(singleRes.status === 200, 'GET /api/projects/:id returns HTTP 200');
      assert(singleData.data.title === firstProject.title, `Matches title: "${singleData.data?.title}"`);

      // 4. POST /api/contact (Valid Submission)
      console.log('\n4️⃣ Testing Contact Form Submission (Valid)...');
      const contactPayload = {
        name: 'John Recruiter',
        email: 'recruiter@techventures.com',
        subject: 'Full Stack Developer Opportunity for Herry',
        message: 'Hello Pandya Herry, we reviewed your impressive portfolio and would love to interview you for a developer role.',
      };
      const contactRes = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactPayload),
      });
      const contactData = await contactRes.json();
      assert(contactRes.status === 201, 'POST /api/contact returns HTTP 201');
      assert(contactData.success === true, 'Contact submission returns success: true');

      // 5. POST /api/contact (Invalid Validation Test)
      console.log('\n5️⃣ Testing Contact Validation Rejection (Invalid)...');
      const invalidContactRes = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'J', email: 'invalid-email', message: 'short' }),
      });
      const invalidContactData = await invalidContactRes.json();
      assert(invalidContactRes.status === 400, 'POST /api/contact with invalid data returns HTTP 400');
      assert(invalidContactData.success === false, 'Rejects invalid email format and length');

      // 6. POST /api/auth/login (Admin Login)
      console.log('\n6️⃣ Testing Admin Authentication...');
      const loginRes = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: process.env.ADMIN_USERNAME || 'admin',
          password: process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!',
        }),
      });
      const loginData = await loginRes.json();
      assert(loginRes.status === 200, 'POST /api/auth/login returns HTTP 200');
      assert(Boolean(loginData.token), 'JWT token returned on successful login');
      adminToken = loginData.token;

      // 7. POST /api/projects (Protected Admin Route)
      console.log('\n7️⃣ Testing Protected Project Creation (with JWT)...');
      const newProjectPayload = {
        title: 'CloudOps CI/CD Automation Pipeline',
        description: 'Automated CI/CD pipeline with GitHub Actions, Docker, and AWS deployment.',
        detailedDescription: 'Full pipeline with test automation, dockerization, and automated rolling deployments.',
        category: 'Backend',
        tags: ['Docker', 'GitHub Actions', 'Node.js', 'Express'],
        liveUrl: 'https://cloudops-demo.dev',
        githubUrl: 'https://github.com/herry-pandya/cloudops-pipeline',
      };
      const createRes = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(newProjectPayload),
      });
      const createData = await createRes.json();
      assert(createRes.status === 201, 'POST /api/projects with token returns HTTP 201');
      assert(createData.data.title === newProjectPayload.title, 'Project created successfully');
      createdProjectId = createData.data._id;

      // 8. PUT /api/projects/:id (Protected Update)
      console.log(`\n8️⃣ Testing Protected Project Update (${createdProjectId})...`);
      const updateRes = await fetch(`${baseUrl}/projects/${createdProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ title: 'CloudOps CI/CD Automation Pipeline (Updated)' }),
      });
      const updateData = await updateRes.json();
      assert(updateRes.status === 200, 'PUT /api/projects/:id returns HTTP 200');
      assert(updateData.data.title.includes('(Updated)'), 'Project updated successfully');

      // 9. DELETE /api/projects/:id (Protected Delete)
      console.log(`\n9️⃣ Testing Protected Project Deletion (${createdProjectId})...`);
      const deleteRes = await fetch(`${baseUrl}/projects/${createdProjectId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const deleteData = await deleteRes.json();
      assert(deleteRes.status === 200, 'DELETE /api/projects/:id returns HTTP 200');
      assert(deleteData.success === true, 'Project deleted successfully');

      // 10. POST /api/projects (Unauthorized Rejection)
      console.log('\n🔟 Testing Unauthorized Access Rejection...');
      const unauthRes = await fetch(`${baseUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProjectPayload),
      });
      assert(unauthRes.status === 401, 'Protected route without token returns HTTP 401 Unauthorized');

      console.log('\n=============================================');
      console.log(`📊 Test Summary: ${passed} passed, ${failed} failed.`);
      console.log('=============================================\n');

      server.close(() => {
        process.exit(failed > 0 ? 1 : 0);
      });
    } catch (err) {
      console.error('💥 Test suite crashed with error:', err);
      if (server) server.close();
      process.exit(1);
    }
  });
};

runTests();

