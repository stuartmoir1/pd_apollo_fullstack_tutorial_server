const { paginateResults } = require('./utils');

module.exports = {
  Query: {
    //launches: (_parent, _args, { dataSources }) => {
    //  return dataSources.launchAPI.getAllLaunches();
    //},
    launches: async (_parent, { pageSize = 20, after }, { dataSources } ) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
      allLaunches.reverse();
      const launches = paginateResults({ after, pageSize, results: allLaunches });
      const numLaunches = launches.length;
      return {
        launches,
        cursor: numLaunches ? launches[numLaunches - 1].cursor : null,
        hasMore: numLaunches
          ? launches[numLaunches - 1].cursor !== allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },
    launch: (_parent, { id }, { dataSources }) => {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },
    me: (_parent, _args, { dataSources }) => {
      return dataSources.userAPI.findOrCreateUser();
    }
  }
};
