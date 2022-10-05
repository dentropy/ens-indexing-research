const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('tutorial_node.db');
const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/02f9493940cc44c295dfd149493e1cea");

async function create_tables(){
    db.serialize(() => {
        try {
            var create_table_query = "\
                CREATE TABLE ens_records_resolved(\
                    ens_name, \
                    ens_record, \
                    ens_record_data\
                )"
            db.run(create_table_query, (err, result) => {
                console.log("Well fuck")
            });
        } catch (err) {
            console.log(err)
        }
        try {
            var create_table_query = "\
            CREATE TABLE ens_records_resolved_errors(\
                ens_name \
            )"
            db.run(create_table_query, (err, result) => {
                console.log("Well fuck")
            });
        } catch (err) {
            console.log(err)
        }
        // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        // for (let i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i);
        // }
        // stmt.finalize();

        // db.each("SELECT * FROM ENS_NAMES LIMIT 5", (err, row) => {
        //     console.log(row);
        // });
    });
    db.close();
}


async function get_ens_name(){
    const select_query = "\
    SELECT * FROM ens_metadata \
        WHERE texts != 'null' AND \
        ens_name NOT IN (SELECT DISTINCT ens_name FROM ens_records_resolved) \
        AND ens_name NOT IN (SELECT DISTINCT ens_name FROM ens_records_resolved_errors) \
        LIMIT 1;"
    let result = ""
    try {
        await db.get(select_query, (err, row) => {
            console.log(`ens_name = ${row.ens_name}`)
            // process the row here 
            result = row
            // console.log(result)
            resolve_ens_records(result.ens_name, JSON.parse(result.texts))
        });
    } catch (err) {
        console.log(err)
    }
    console.log(result) // Database
    return result
}

async function resolve_ens_records(ens_name, ens_records){
    console.log(`\n${ens_name}\n`)
    // console.log(ens_records)
    if (ens_records == null){
        // WRITE NO RECORDS TO DATABASE
        var our_query = `INSERT INTO ens_records_resolved_errors (ens_name) VALUES ('${ens_name}');`
        console.log(our_query)
        await db.get(our_query, (err, row) => {
            console.log(row)
        });
        return 0;
    }
    let records = {}
    const resolver = await provider.getResolver(ens_name);
    for(var i = 0; i < ens_records.length; i++){
        let record = await resolver.getText(ens_records[i]);
        records[ens_records[i]] = record
    }
    console.log(records)
    console.log(JSON.stringify(records))


    // How the fuck do I loop through this
    // Can I just insert multiple rows like a real top G?
    // Why of course
    var insert_query = `\
    INSERT INTO ens_records_resolved \
        (ens_name, ens_record, ens_record_data) VALUES`
    for(var record_name in records){
        insert_query += "('" + ens_name + "', '" + record_name + "', '" + JSON.stringify(records[record_name]) + "'),"
    }
    insert_query = insert_query.substring(0, insert_query.length - 1);
    console.log(insert_query)
    try {
        await db.get(insert_query, (err, row) => {
            console.log(row)
            get_ens_name()
        });
    } catch (err) {
        console.log(err)
    }
}
async function resolve_ens_record(ens_name, ens_record){

}

async function main(){
    // await create_tables()
    console.log(await get_ens_name() ) // Undefined
    // await resolve_ens_records("rickmoo.eth")
}

main()