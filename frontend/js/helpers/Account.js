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
      switch (element.type){
        case 'deposit':
          if(this.username == element.account){
            total += parseInt(element.amount)
          }
          break
        case 'withdraw':
          if(this.username == element.account){
            total -= parseInt(element.amount)
          }
          break
        case 'transfer':
          if(element.from == this.username){
            total -= parseInt(element.amount)
          }
          if(element.to == this.username){
            total += parseInt(element.amount)
          }
          break
      }

    });

    return total
  }
}
