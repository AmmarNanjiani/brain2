import configparser
import secrets

config = configparser.RawConfigParser()
config.read('config.ini')
if config['DEV']['SECRET_KEY'] == 'changeme':
    config.set('DEV', 'SECRET_KEY', secrets.token_urlsafe())

    with open('config.ini', 'w') as configfile:
        config.write(configfile)