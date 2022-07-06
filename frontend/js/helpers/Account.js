class Account {
  constructor(username, transactions) {
    this.username = username;
    if(transactions != null){
      this.transactions = transactions;
    } else {
      this.transactions = []
    }
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
}
