class User < ActiveRecord::Base
  has_many :projects, foreign_key: "initiator_id"
  has_many :versions, foreign_key: "contributor_id"
  has_many :votes, foreign_key: "user_id"

  has_secure_password

  def unique_projects
    self.versions.map(&:project).uniq
  end

  def capitalize_full_name
    self.name.split.map(&:capitalize).join(" ")
  end

  def voted_on_this?(this)
    this.votes.where(user_id: self.id).length > 0
  end

  include Gravtastic
  gravtastic

end
