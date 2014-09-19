class User < ActiveRecord::Base
  has_many :projects, foreign_key: "initiator_id"
  has_many :versions, foreign_key: "contributor_id"
  has_many :votes, foreign_key: "user_id"

  has_secure_password

  def unique_projects
    self.versions.map(&:project).uniq
  end

  # def versions_by_project
  #   unique_projects.map do |project|
  #     version_list = project.versions.where(contributor: self)
  #     { project: project,
  #       version_count: version_list.length,
  #       versions: version_list }
  #   end
  # end
end
