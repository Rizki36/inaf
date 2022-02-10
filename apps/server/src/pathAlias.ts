import ModuleAlias from 'module-alias'

ModuleAlias.addAliases({
  '@config': `${__dirname}/config`,
  '@routes': `${__dirname}/routes`,
  '@lib': `${__dirname}/lib`,
})