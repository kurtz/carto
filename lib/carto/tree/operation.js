(function(tree) {


tree.Operation = function Operation(op, operands, index) {
    this.op = op.trim();
    this.operands = operands;
    this.index = index;
};
tree.Operation.prototype.eval = function(env) {
    var a = this.operands[0].eval(env),
        b = this.operands[1].eval(env),
        temp;

    if (a instanceof tree.Dimension && b instanceof tree.Color) {
        if (this.op === '*' || this.op === '+') {
            temp = b, b = a, a = temp;
        } else {
            throw {
                name: "OperationError",
                message: "Can't substract or divide a color from a number",
                index: this.index
            };
        }
    }
    return a.operate(this.op, b);
};

tree.operate = function(op, a, b) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
    }
};

})(require('carto/tree'));
