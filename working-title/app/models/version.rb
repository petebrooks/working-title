class Version < ActiveRecord::Base
  belongs_to :project
  belongs_to :contributor, class_name: "User"
  belongs_to :previous_version, class_name: "Version"
  has_many :votes, as: :voteable
  has_many :children, class_name: "Version", foreign_key: "previous_version_id"

  def text_before
    self.previous_version.all_previous
  end

  def text_all
    text_before.join("\n") + contribution
  end

  def all_previous
    return [self.contribution] if self.previous_version == nil
    self.previous_version.all_previous + [self.contribution]
  end

end
