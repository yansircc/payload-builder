export class loginLocator {
  static email = 'input[id="field-email"]'
  static password = 'input[id="field-password"]'
  static loginButton = '[class="form-submit"]'
}

export class multiTenantLocator {
  static tenantDropDownBtn = 'button[class="dropdown-indicator"]'
  static tenantButton = 'a[id="nav-tenants"]'
  static createTenantBtn = '[type="button"][aria-label="Create new Tenant"]'
  static tenantName = 'input[id="field-name"]'
  static tenantDomain = 'input[id="field-domain"]'
  static tenantSlug = 'input[id="field-slug"]'
  static tenantSaveBtn = '[id="action-save"]'
  static searchFilter = 'input[id="search-filter-input"]'
  static searchedData = 'tbody > tr[class="row-1"]'
  static searchedName = 'td[class="cell-name"]'
  static searchedDomain = 'td[class="cell-domain"]'
  static searchedSlug = 'td[class="cell-slug"]'
  static selectCheckBox = 'input[type="checkbox"]'
  static confirmDeleteBtn = 'button[id="confirm-delete"]'
}
