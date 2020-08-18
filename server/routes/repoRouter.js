// Translate github url to repo string
// TODO: validation

const router = (req, res) => {
    const link = req.path;
    let num = link.indexOf('/');
    
    let counter = 0;
    while (num != -1 && counter < 2){
        num = link.indexOf('/', num+1);
        counter++;
    }
    if (counter <= 2 && num == -1){
        num = link.length;
    }
    
    res.send(link.slice(0, num));
};

module.exports = router;