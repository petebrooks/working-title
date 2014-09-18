module VersionsHelper
  def initial_version
    # @version.project.versions.first == @version
  end

  def new_initial_version(version)
    version.project.versions.first == version && version.project.initiator == current_user && version.contribution == nil
  end
end
