import requests

BASE='http://127.0.0.1:8000'
# login
r = requests.post(f'{BASE}/api/admin/login', data={'username':'admin@taptosmile.org','password':'admin123'})
print('login status', r.status_code, r.text)
if r.status_code!=200:
    raise SystemExit('Login failed')

token = r.json().get('access_token')
print('token', token)
headers={'Authorization': f'Bearer {token}'}
# try create program
payload={'title':'demo from script','description':'This is a test program created by script','icon':'🎯','is_active':True}
r2 = requests.post(f'{BASE}/api/programs', json=payload, headers=headers)
print('create status', r2.status_code, r2.text)
