class CreateVersions < ActiveRecord::Migration
  def change
    create_table :versions do |t|
      t.belongs_to :project
      t.belongs_to :contributor
      t.belongs_to :previous_version

      t.text :contribution
      t.integer :insertion_index

      t.index :previous_version_id

      t.timestamps
    end
  end
end
