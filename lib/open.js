let handler = (loadConfig, spawn, name) => {


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
            "-p",
            String(server.port),
            `${server.user}@${server.host}`
        ];

        const ssh = spawn("sshpass", args, {
            stdio: "inherit"
        });

    ssh.on("exit", (code) => {
      process.exit(code);
    });
  
}

handler.command = "open"

export default handler;