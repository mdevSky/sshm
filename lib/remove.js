
let handler = (saveConfig, loadConfig, name) => {


    const config = loadConfig();

    if (!config[name]) {
        console.error(
            `Server '${name}' tidak ditemukan`
        );
        process.exit(1);
    }

    delete config[name];

    saveConfig(config);

    console.log(
        `✓ SSH '${name}' dihapus`
    );

}

handler.command = "remove";

export default handler;
