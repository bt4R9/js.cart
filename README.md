#Javascript cart

###Cart based on LocalStorage with fallback on coockies

#####Usage:

    cart.add(1, 100) // { 1: [ /* amount */ 100, /* price */ 1] }

    cart.setPrice(1, 200) // { 1: [100, 200] }

    cart.set(2, 100, 400) // { 1: [100, 200], 2: [100, 400]

    cart._totalSum // 60000

    cart.getSumById(2) // 40000

    cart.remove(1) // { 2: [100, 400] }

    cart.reduce(2, 100) // { 2: [100, 300] }

    cart.add(3, 10)
    cart.add(4, 10)
    cart.add(5, 10)

    cart.currentState() // { 2: [100, 300], 3: [10, 1], 4: [10, 1], 5: [10, 1] }

    cart.get(2) // [100, 300]

    cart.purge()

    cart.currentState() // false