class Account {
  constructor(username, transactions, id) {
    this.username = username;
    this.id = id
    if(transactions != null){
      this.transactions = transactions;
    } else {
      this.transactions = []
    }

  }

  get balance() {
    let total=0;
    this.transactions.forEach(element => {
      total += parseInt(element.amount)
    });

    return total
  }
}
