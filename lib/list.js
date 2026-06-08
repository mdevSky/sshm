import Table from "cli-table3";

let handler = (loadConfig) => {

    
        const config = loadConfig();
    
        const table = new Table({
          head: [
            "NAME",
            "USER",
            "HOST",
            "PORT"
          ]
        });
    
        const entries =
          Object.entries(config);
    
        if (entries.length === 0) {
          console.log(
            "Belum ada server tersimpan."
          );
          return;
        }
    
        for (const [name, ssh] of entries) {
          table.push([
            name,
            ssh.user,
            ssh.host,
            ssh.port
          ]);
        }
    
        console.log(table.toString());
      
}

handler.command = "list";

export default handler;