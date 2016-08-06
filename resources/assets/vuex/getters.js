
/**
 * App store
 */

exports.getCurrentLanguage = function (state) {
    return state.app.language
}

exports.getCurrentCurrency = function (state) {
    var currencies = state.remote.currencies.filter(function (currency) {
        return currency.id == state.app.currency_id
    })
    if (currencies.length === 0) {
        return {}
    }
    return currencies[0]
}

exports.getCurrentAccount = function (state) {
    var accounts = state.remote.accounts.filter(function (account) {
        return account.id == state.app.account_id
    })
    if (accounts.length === 0) {
        return {}
    }
    return accounts[0]
}

exports.getCurrentEnvelope = function (state) {
    var envelopes = state.remote.envelopes.filter(function (envelope) {
        return envelope.id == state.app.envelope_id
    })
    if (envelopes.length === 0) {
        return {}
    }
    return envelopes[0]
}

exports.getDevelopmentDate = function (state) {
    return state.app.developmentDate
}



/**
 * Lang store
 */

exports.getText = function (state) {
    return state.lang[state.app.language]
}

exports.getAvailableLanguages = function (state) {
    return Object.keys(state.lang)
}



/**
 * Remote store : currencies
 */

exports.getCurrencies = function (state) {
    return state.remote.currencies
}




/**
 * Remote store : accounts
 */

exports.getAllAccounts = function (state) {
    return state.remote.accounts
}

exports.getEnabledAccounts = function (state) {
    return state.remote.accounts.filter(function (account) {
        return account.deleted_at === null
    })
}

exports.getDisabledAccounts = function (state) {
    return state.remote.accounts.filter(function (account) {
        return account.deleted_at !== null
    })
}

exports.getAccountDevelopment = function (state) {
    return state.remote.accountDevelopment
}

exports.getEnabledAccountsBalance = function (state) {
    var balance = 0

    exports.getEnabledAccounts(state).forEach(function (envelope) {
        balance += envelope.balance
    })

    return balance.toFixed(2)
}



/**
 * Remote store : envelopes
 */

exports.getAllEnvelopes = function (state) {
    return state.remote.envelopes
}

exports.getEnabledEnvelopes = function (state) {
    return state.remote.envelopes.filter(function (envelope) {
        return envelope.deleted_at === null
    })
}

exports.getDisabledEnvelopes = function (state) {
    return state.remote.envelopes.filter(function (envelope) {
        return envelope.deleted_at !== null
    })
}

exports.getEnvelopeDevelopment = function (state) {
    return state.remote.envelopeDevelopment
}

exports.getEnabledEnvelopesBalance = function (state) {
    var balance = 0

    exports.getEnabledEnvelopes(state).forEach(function (envelope) {
        balance += envelope.balance
    })

    return balance.toFixed(2)
}

exports.getEnabledEnvelopesSavings = function (state) {
    var incomes = 0
    var outcomes = 0

    exports.getEnabledEnvelopes(state).forEach(function (envelope) {
        incomes += envelope.monthly.incomes;
        outcomes += envelope.monthly.outcomes;
    })

    return (incomes - outcomes).toFixed(2)
}

exports.getEnabledEnvelopesRelativeSavings = function (state) {
    var incomes = 0
    var outcomes = 0

    exports.getEnabledEnvelopes(state).forEach(function (envelope) {
        incomes += envelope.monthly.incomes;
        outcomes += envelope.monthly.outcomes;
    })

    if (incomes == 0) {
        return 0
    }

    return ((incomes - outcomes) * 100 / incomes).toFixed(2)
}

exports.getCurrentEnvelopeSavings = function (state) {
    var envelope = exports.getCurrentEnvelope(state)

    if (envelope.monthly === undefined) {
        return 0
    }

    incomes = envelope.monthly.incomes;
    outcomes = envelope.monthly.outcomes;

    return (incomes - outcomes).toFixed(2)
}

exports.getCurrentEnvelopeRelativeSavings = function (state) {
    var envelope = exports.getCurrentEnvelope(state)

    if (envelope.monthly === undefined) {
        return 0
    }

    incomes = envelope.monthly.incomes;
    outcomes = envelope.monthly.outcomes;

    if (incomes == 0) {
        return 0
    }

    return ((incomes - outcomes) * 100 / incomes).toFixed(2)
}

