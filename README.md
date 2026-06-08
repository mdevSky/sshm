# SSHM

Simple SSH Manager for Linux, macOS, and Windows.

SSHM adalah command line tool sederhana yang memudahkan penyimpanan dan pengelolaan koneksi SSH layaknya PM2 untuk server SSH. Dengan SSHM, kamu tidak perlu menghafal IP Address, username, atau port server karena semua koneksi dapat disimpan dan diakses menggunakan nama alias.

---

## Features

* Menyimpan koneksi SSH dengan alias
* Membuka koneksi menggunakan nama server
* Menampilkan daftar server dalam bentuk ASCII Table
* Menghapus koneksi yang tersimpan
* Konfigurasi tersimpan secara lokal
* Ringan dan cepat
* Cross Platform (Linux, macOS, Windows)

---

## Preview

### Add Server

```bash
sshm add production root@103.12.34.56 --port=2222
```

### List Server

```bash
sshm list
```

Output:

```text
┌────────────┬────────┬─────────────┬──────┐
│ NAME       │ USER   │ HOST        │ PORT │
├────────────┼────────┼─────────────┼──────┤
│ production │ root   │ 103.12.34.56│ 2222 │
│ staging    │ ubuntu │ 10.0.0.5    │ 22   │
└────────────┴────────┴─────────────┴──────┘
```

### Open Server

```bash
sshm open production
```

---

## Requirements

### Runtime

* Node.js 18+
* npm 8+

### SSH Client

#### Linux

Biasanya sudah tersedia:

```bash
ssh -V
```

Jika belum:

Ubuntu/Debian:

```bash
sudo apt install openssh-client
```

Fedora:

```bash
sudo dnf install openssh-clients
```

Arch Linux:

```bash
sudo pacman -S openssh
```

#### macOS

SSH sudah tersedia secara bawaan.

Cek:

```bash
ssh -V
```

#### Windows

Install OpenSSH Client:

Settings → Optional Features → OpenSSH Client

atau menggunakan PowerShell:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH.Client*'
```

---

## Required Dependency

Jika ingin login otomatis menggunakan password:

### Linux

```bash
sudo apt install sshpass
```

### macOS

```bash
brew install hudochenkov/sshpass/sshpass
```

### Windows

Disarankan menggunakan SSH Key Authentication.

---

## Minimum System Requirements

### Linux

* CPU: 1 Core
* RAM: 256 MB
* Storage: 50 MB

### macOS

* macOS 11+
* RAM: 512 MB

### Windows

* Windows 10 / Windows 11
* RAM: 512 MB

---

## Installation

### Clone Repository

```bash
git clone https://github.com/mdevSky/sshm.git
cd sshm
```

### Install Dependencies

```bash
npm install
```

### Register Global Command

Linux/macOS:

```bash
chmod +x ./bin/sshm.js
npm link
```

Windows:

```bash
npm link
```

Verify:

```bash
sshm --help
```

---

# Uninstall

### unlink package

```bash 
cd ~/sshm 
npm unlink --global
```

---

## Commands

### Add Server

```bash
sshm add <name> <user@host>
```

Example:

```bash
sshm add production root@103.12.34.56
```

Custom Port:

```bash
sshm add production root@103.12.34.56 --port=2222
```

With Password:

```bash
sshm add production root@103.12.34.56 --port=2222 --password=mypassword
```

---

### Show Server List

```bash
sshm list
```

---

### Open Connection

```bash
sshm open <name>
```

Example:

```bash
sshm open production
```

---

### Remove Connection

```bash
sshm remove <name>
```

Example:

```bash
sshm remove production
```

---

## Configuration File

SSHM menyimpan konfigurasi di:

### Linux

```text
~/.sshm/config.json
```

### macOS

```text
~/.sshm/config.json
```

### Windows

```text
C:\Users\<username>\.sshm\config.json
```

Contoh:

```json
{
  "production": {
    "user": "root",
    "host": "103.12.34.56",
    "port": 2222,
    "password": "secret"
  }
}
```

---

## Security Notice

Menyimpan password secara plain text tidak direkomendasikan untuk penggunaan produksi.

Disarankan menggunakan SSH Key Authentication:

```bash
ssh-keygen -t ed25519
```

Copy public key ke server:

```bash
ssh-copy-id user@host
```

Setelah itu SSHM dapat membuka koneksi tanpa perlu memasukkan password.

---

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
node sshm.js list
```

Test add server:

```bash
node sshm.js add test root@127.0.0.1
```

---

## Roadmap

* [ ] Edit server configuration
* [ ] Server grouping
* [ ] Import / Export configuration
* [ ] Encryption for stored passwords
* [ ] TUI Dashboard
* [ ] Fish/Bash/Zsh Autocomplete
* [ ] Ping Monitoring
* [ ] Multi Session Support
* [ ] SSH Key Management

---

## License

MIT License

Copyright (c) 2026
