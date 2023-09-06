const fs = require("fs");

const read = (file_path) => {
    try {
        let data_read = fs.readFileSync(file_path, { encoding: "utf8" });
        return data_read;
    } catch (err) {
        return { "error": err.message || err };
    }
}

const write = (file_path, data) => {
    try {
        let data_written = fs.writeFileSync(file_path, data);
        return data_written;
    } catch (err) {
        return { "error": err.message || err };
    }
}

const append = (file_path, data) => {
    try {
        let data_appended = fs.appendFileSync(file_path, data);
        return data_appended;
    } catch (err) {
        return { "error": err.message || err };
    }
}

module.exports = { read, write, append };