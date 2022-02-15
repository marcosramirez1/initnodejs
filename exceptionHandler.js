exports.handle = (err) => {
    if (err.code === 'ENOENT') { 
        console.log('File not found ', fileName);
    }
    else {
       throw err
    }
}