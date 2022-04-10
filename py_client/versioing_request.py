import requests

"""
Для корректной отработки скрипта предварительно закомментировать 
'DEFAULT_PERMISSION_CLASSES' в settings 
"""

response = requests.get('http://127.0.0.1:8000/api/users/')

print('Результат запроса списка пользователей без версии')
print(response.json())

print('*' * 100)

response = requests.get('http://127.0.0.1:8000/api/users/', headers={
    'Accept': 'application/json; version=2.0'
})
print('Результат запроса списка пользователей c версией 2.0')
print(response.json())
