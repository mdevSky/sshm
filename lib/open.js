let handler = (loadConfig, spawn, name) => {

  try {

    const config = loadConfig();

    const server = config[name];

    if (!server) {
      console.error(
        `Server '${name}' tidak ditemukan`
      );
      process.exit(1);
    }

    const args = [
      "-p",
      server.password,
      "ssh",
      "-o",
      "StrictHostKeyChecking=no",
      "-o",
      "UserKnownHostsFile=/dev/null",
      "-p",
      String(server.port),
      `${server.user}@${server.host}`
    ];

    const ssh = spawn("sshpass", args, {
      stdio: "inherit"
    });

    ssh.on("error", (err) => {
      console.error("Spawn error:", err);
    });

    ssh.on("exit", (code) => {
      process.exit(code);
    });

  } catch (err) {
    console.error('Error:', err);

  }

}

handler.command = "open"

export default handler;