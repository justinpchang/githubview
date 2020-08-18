// Translate github url to repo object
// TODO: validation

const router = (req, res) => {
    const link = req.path;
    const num = link.indexOf('/');
    
    let counter = 0;
    while (num != -1 && counter < 2){
        num = link.indexOf('/', num+1);
        counter++;
    }
    if (counter <= 2 && num == -1){
        num = link.length;
    }
    let arr = link.slice(0, num).split('/');
    if (arr.length <=2 ){
        res.sendStatus('404');
    }
    let obj = {'user': arr[1], 'repo': arr[2]};
    res.send(obj);
};

module.exports = router;