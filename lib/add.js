
let handler = (saveConfig, loadConfig, name, userhost, options) => {


    if (!userhost.includes("@")) {
        console.error(
            "Format harus user@host"
        );
        process.exit(1);
    }

    const [user, host] =
        userhost.split("@");

    const config = loadConfig();

    config[name] = {
        user,
        host,
        port: Number(options.port),
        password:
            options.password || ""
    };

    saveConfig(config);

    console.log(
        `✓ SSH '${name}' berhasil ditambahkan`
    );

}

handler.command = "add";

export default handler;