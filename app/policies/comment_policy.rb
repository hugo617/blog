class CommentPolicy < ApplicationPolicy
  def create?
    user.present?
  end

  def update?
    owner?
  end

  def destroy?
    owner? || admin?
  end

  def approve?
    admin?
  end

  def reject?
    admin?
  end

  private

  def owner?
    user.present? && user == record.user
  end

  def admin?
    user.present? && user.email == 'admin@example.com'
  end

  class Scope < Scope
    def resolve
      scope.all
    end
  end
end
